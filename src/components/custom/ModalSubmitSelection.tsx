import React, { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, X, AlertCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import success from "../assets/success.svg"
import { useToast } from "@/hooks/use-toast";
import { CustomToast } from "./CustomToast";

type ToastProps = {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
};



const FormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is too short"),
  zipCode: z.string().min(5, "Zip code is required"),
  year: z.string().min(4, "Year is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export type TintData = {
  frontTintPercent: number;
  backTintPercent: number;
  frontSideTintPercent: number;
  rearSideTintPercent?: number;
  tintType: string;
  ppfOption: string;
  carColor: string;
  vehicleType: "SEDAN" | "SUV" | "PICKUP"

};

type ModalSubmitSelectionProps = {
  open: boolean;
  onClose: () => void;
  tintData: TintData;
};

export default function ModalSubmitSelection({
  open,
  onClose,
  tintData,
}: ModalSubmitSelectionProps) {
  const [currentStep, setCurrentStep] = useState('form');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pathname = window.location.pathname;
  const token = pathname.split("/")[2]; // /view/:token → index 2
  // const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const handleClose = () => {
    setCurrentStep('form');
    onClose();
    reset();
  };
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  } | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const payload = {
      token: token,
      userData: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      },
      carData: {
        zipCode: data.zipCode,
        year: data.year,
        make: data.make,
        model: data.model,
        tintType: (() => {
          switch (tintData.tintType) {
            case "black-ceramic": return 2;
            case "i3-ceramic": return 3;
            case "air-ceramic": return 4;
            default: return 1;
          }
        })(),
        frontWindshieldTint: tintData.frontTintPercent,
        frontWindowsTint: tintData.frontSideTintPercent,
        rearWindowsTint: tintData.rearSideTintPercent,
        carColor: tintData.carColor,
        ppfKit: (() => {
          switch (tintData.ppfOption) {
            case "partial-front": return 2;
            case "full-front": return 3;
            case "full-car": return 4;
            default: return 1;
          }
        })(),
      },
      notes: data.notes || "",
    };

    try {
      const res = await fetch("https://phpstack-1269627-5582051.cloudwaysapps.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        console.log("first")
        setCurrentStep('success');
      } else {
        console.log("djdnc")
        const errorMessage = result.errors
          ? result.errors.map(err => err.message).join(', ')
          : result.message || 'Submission failed';
        // toast({
        //   title: "Submission Failed",
        //   description: errorMessage,
        //   variant: "destructive",
        // });

        setToast({
          message: errorMessage,
          type: 'error',
          visible: true,
        });
      }
    } catch (err) {
      setToast({
        message: "Error",
        type: 'error',
        visible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="!w-[702px]" style={{ background: 'linear-gradient(to bottom, #FBFF8899, #F9FD81)' }}>
          {currentStep === 'form' ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-start font-bold text-xl">
                  SUBMIT SELECTION
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex gap-6">
                  <span className="font-normal">Type:</span>
                  <span className="font-semibold">{tintData.vehicleType}</span>
                </div>
                <div className="flex gap-6">
                  <span className="font-normal">Front Windows:</span>
                  <span className="font-semibold">{tintData.frontSideTintPercent}%</span>
                </div>
                <div className="flex gap-6">
                  <span className="font-normal">Rare Windows:</span>
                  <span className="font-semibold">{tintData.rearSideTintPercent}%</span>
                </div>
                <div className="flex gap-6">
                  <span className="font-normal">Film Type</span>
                  <span className="font-semibold">{tintData.tintType.replace("-", " ").toUpperCase()}</span>
                </div>
                <div className="flex gap-6">
                  <span className="font-normal">PPF</span>
                  <span className="font-semibold">{tintData.ppfOption === 'no' ? 'NO' : tintData.ppfOption.replace("-", " ").toUpperCase()}</span>
                </div>
              </div>

              {/* Form Section */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <Input
                      placeholder="Full Name"
                      {...register("fullName")}
                      className={errors.fullName ? "border-red-500" : ""}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">
                        {(errors.fullName as FieldError).message as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Input
                      placeholder="Phone"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">
                        {(errors.phone as FieldError).message as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Input
                      placeholder="Email"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {(errors.email as FieldError).message as string}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <Input
                      placeholder="Year"
                      {...register("year")}
                      className={errors.year ? "border-red-500" : ""}
                    />
                    {errors.year && (
                      <p className="text-sm text-red-500">{(errors.year as FieldError).message as string}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Input
                      placeholder="Make"
                      {...register("make")}
                      className={errors.make ? "border-red-500" : ""}
                    />
                    {errors.make && (
                      <p className="text-sm text-red-500">
                        {(errors.make as FieldError).message as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Input
                      placeholder="Model"
                      {...register("model")}
                      className={errors.model ? "border-red-500" : ""}
                    />
                    {errors.model && (
                      <p className="text-sm text-red-500">
                        {(errors.model as FieldError).message as string}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Input
                      placeholder="Zip Code"
                      {...register("zipCode")}
                      className={errors.zipCode ? "border-red-500" : ""}
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-500">
                        {(errors.zipCode as FieldError).message as string}

                      </p>
                    )}
                  </div>
                </div>

                <Textarea
                  placeholder="Notes & Comments"
                  {...register("notes")}
                  className="h-24"
                />
                <div className="flex justify-center py-5">
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    className="w-[320px] !self-center h-[40px] bg-black text-white font-bold py-3 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT SELECTION"}
                  </Button>
                </div>
                <div className="flex justify-center text-red-600">

                  {toast?.message}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center flex flex-col py-8 gap-4">
              <div className="mb-6 flex flex-col gap-4  items-center">
                <div className="relative w-fit flex justify-center">
                  {/* Glow background */}
                  <div className="absolute inset-[-20px] z-0 p-20 blur-[50.5px] bg-[#ffffff] opacity-40 rounded-full" />

                  {/* Foreground image */}
                  <img src={success} alt="Success" className="relative z-10" />
                </div>
                <h2 className="text-base font-bold text-black mb-2">THANK YOU!</h2>
                <p className="text-gray-800 text-base font-bold">Your selection has been submitted</p>
              </div>

              <div className="space-y-3  mt-16 flex flex-col  items-center">
                <Button
                  onClick={handleClose}
                  className=" py-3 bg-black text-white font-bold w-[320px] h-[40px]"
                >
                  SUBMIT ANOTHER SELECTION
                </Button>
               
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </>
  );
}