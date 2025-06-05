import * as THREE from "three";

export const isBodyPart = (
  name: string,
): boolean => {
  const lowerName = name.toLowerCase();
  return (
    lowerName.includes("body") ||
    lowerName.includes("bumper") ||
    lowerName.includes("fender") ||
    lowerName.includes("hood") ||
    lowerName.includes("door") ||
    lowerName.includes("side") ||
    lowerName.includes("trunk") ||
    lowerName.includes("rearwing")
  );
};

export const resetBodyKitParts = (
  scene: THREE.Group,
  originalGeometries: Map<string, THREE.BufferGeometry>,
  carColor: THREE.Color,
  vehicleType: "SEDAN" | "SUV" | "PICKUP"
): void => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && isBodyPart(child.name)) {
      const originalGeometry = originalGeometries.get(child.name);
      if (originalGeometry) {
        child.geometry = originalGeometry.clone();

        const customMaterial = getCustomMaterial(child.name);
        child.material = customMaterial
          ? customMaterial
          : new THREE.MeshPhysicalMaterial({
              color: carColor,
              metalness: 0.6,
              roughness: 0.2,
              clearcoat: 0.9,
              clearcoatRoughness: 0.1,
              reflectivity: 1.0,
              envMapIntensity: 1.0,
            });
      }
    }
  });
};

const isFrontPart = (
  name: string,
  vehicleType: "SEDAN" | "SUV" | "PICKUP"
): boolean => {
  if (vehicleType == "SUV") {
    return (
      name.includes("fender_front_part_Object011003") ||
      name.includes("rear_view_mirror_body") ||
      name.includes("fender_front_part_Object011003-2") ||
      name.includes("fender_front_part_Object011003") ||
      name.includes("fender_front_part_Object012001") ||
      name.includes("fender_front_part_Object015002") ||
      name.includes("body_part")
    );
  } else if (vehicleType == "PICKUP") {
    return (
      name.includes("body_front_wing-2") ||
      name.includes("body_part3") ||
      name.includes("bumper_part_f2") ||
      name.includes("body_front_wing-3")
    );
  } else {
    return (
      name.includes("CarPaint_Front-1") ||
      name.includes("CarPaint_Front-2") ||
      name.includes("DoorFrRight-CarPaint-1") ||
      name.includes("DoorFrLeft-CarPaint-1")
    );
  }
};

const isPartialFrontPart = (
  name: string,
  vehicleType: "SEDAN" | "SUV" | "PICKUP"
): boolean => {
  if (vehicleType == "SUV") {
    return (
      name.includes("fender_front_part_Object011003") || name.includes("hood")
    );
  } else if (vehicleType == "PICKUP") {
    return (
      name.includes("body_front_wing-2") ||
      name.includes("body_part3") ||
      name.includes("bumper_part_f2")
    );
  } else {
    return name.includes("CarPaint_Front-2");
  }
};

const shouldApplyPPF = (
  name: string,
  option: string,
  vehicleType: "SEDAN" | "SUV" | "PICKUP"
): boolean => {
  switch (option) {
    case "partial":
      return isPartialFrontPart(name, vehicleType);

    case "full-front":
      return isFrontPart(name, vehicleType);

    case "full-car":
      return true;

    default:
      return false;
  }
};

export const applyBodyKit = (
  scene: THREE.Group,
  option: string,
  originalGeometries: Map<string, THREE.BufferGeometry>,
  carColor: THREE.Color,
  vehicleType: "SEDAN" | "SUV" | "PICKUP"
): void => {
  if (option === "none") return;
  console.log(vehicleType, "veeee type");
  let modifiedParts = 0;
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && isBodyPart(child.name)) {
      const customMaterial = getCustomMaterial(child.name);
      if (customMaterial) {
        child.material = customMaterial;
        return;
      }

      if (shouldApplyPPF(child.name, option, vehicleType)) {
        const ppfMaterial = new THREE.MeshPhysicalMaterial({
          color: carColor.clone(),
          metalness: 0.9,
          roughness: 0.2,
          clearcoat: 1.0,
          clearcoatRoughness: 0.03,
          reflectivity: 1.0,
          envMapIntensity: 1.25,
          transparent: true,
          opacity: 1,
          transmission: 0.9,
          ior: 1.4,
        });

        child.material = ppfMaterial;
        modifiedParts++;
      }
    }
  });

  // console.log(`Applied ${option} PPF to ${modifiedParts} parts`);
};

type MaterialRule = {
  match: (name: string) => boolean;
  material: THREE.MeshPhysicalMaterial;
};

const createMaterial = (
  params: ConstructorParameters<typeof THREE.MeshPhysicalMaterial>[0]
) => new THREE.MeshPhysicalMaterial(params);

const BLACK_COLOR = new THREE.Color("#2F2F2F");

const defaultBlackMaterial = createMaterial({
  color: BLACK_COLOR,
  metalness: 0.8,
  roughness: 0.3,
  clearcoat: 0.7,
  clearcoatRoughness: 0.1,
  reflectivity: 1.0,
  envMapIntensity: 1.2,
});

const plasticNumberMaterial = createMaterial({
  color: new THREE.Color("black"),
  metalness: 0.6,
  roughness: 0.2,
  clearcoat: 0.9,
  clearcoatRoughness: 0.1,
  reflectivity: 1.0,
  envMapIntensity: 1.0,
});

const carbonMaterial = createMaterial({
  color: BLACK_COLOR,
  metalness: 1.0,
  roughness: 0.4,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  reflectivity: 1.0,
  envMapIntensity: 1.2,
});

const cardinalRedMaterial = createMaterial({
  color: new THREE.Color("#8C1D40"), // Cardinal Red
  metalness: 1.0,
  roughness: 0.4,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1,
  reflectivity: 1.0,
  envMapIntensity: 1.2,
});

const mattMatealMaterial = createMaterial({
  color: new THREE.Color("#8A8D8F"),
  metalness: 0.6,
  roughness: 0.2,
  clearcoat: 0.9,
  clearcoatRoughness: 0.1,
  reflectivity: 1.0,
  envMapIntensity: 1.0,
});

const includesAny = (targets: string[]) => (name: string) =>
  targets.some((target) => name.toLowerCase().includes(target));

const specialMaterialRules: MaterialRule[] = [
  {
    match: includesAny(["body-plasticnumber"]),
    material: plasticNumberMaterial,
  },

  {
    match: includesAny(["bumper_front_part_024"]),
    material: mattMatealMaterial,
  },
  {
    match: includesAny(["body-carbon", "detail_rear_bumper_edge"]),
    material: carbonMaterial,
  },
  {
    match: includesAny([
      "logo_rear",
      "logo_rear_DENAIL_text",
      "logo_rear_part",
      "logo_front_part",
    ]),
    material: cardinalRedMaterial,
  },

  {
    match: includesAny([
      "doorfrleft-metaldark",
      "body-plasticblack",
      "body-glasslights",
      "glasslights",
      "metaldark",
      "body-black",
      "body-rubber",
      "intburmestergrid",
      "logo_side02",
      "bumper_part_f1",
      "bumper_part_f3",
      "bumper_part_f4",
      "detail_fastener",
      "body_front_bumper_part1",
      "body_front_bumper",
      "halogen_body05",
      "body_part5",
      "side_backward_mirror",
      "detail_door_handle_side",
      "body_rear_wing_part",
      "body_front_wing_part",
      "body_parts_underbody",
      "detail_antenna_part",

      // For Ford SUV
      "bumper_front_part_014",
      "bumper_front_part_028",
      "bumper_front_part_018",
      "bumper_front_part_006",
      "bumper_front_part_009",
      "bumper_front_part_031",
      "bumper_front_part_015",
      "tire_wheel_trunk_005001",
      "tire_wheel_trunk_007004",
      "tire_wheel_trunk_009005",
      "tire_wheel_trunk_004003",
      "tire_wheel_trunk_01002",
      "trunk_handle",
      "door_handle",
      "roof",
      "cleaner",
      "hood_grill_part_object003001",
      "hood_grill_part_object005003",
      "hood_grid",
      "hood_grill_part_object055002",
      "rear_view_mirror_body",
      "hood_part_03",
      "bumper_rear_part_object036001",
      "pipe",
      "bumper_rear_part_torus002005",
      "bumper_rear_part_object044003",
      "bumper_rear_part_object043006",
      "bumper_front_part_024",
      "trunk_part",
      "door_part",
    ]),
    material: defaultBlackMaterial,
  },
];

const getCustomMaterial = (name: string): THREE.MeshPhysicalMaterial | null => {
  for (const rule of specialMaterialRules) {
    if (rule.match(name)) {
      return rule.material;
    }
  }
  return null;
};
