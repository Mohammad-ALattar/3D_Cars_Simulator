export const identifyWindowType = (
  meshName: string
): "frontWindshield" | "rearWindow" | "sideWindow" | "other" => {
  const name = meshName.toLowerCase();

  if (
    name.includes("windshield") ||
    name.includes("frontglass") ||
    name.includes("front_glass") ||
    name.includes("windscreen") ||
    name === "object_46_glass_0" ||
    name === "object_46" ||
    name === "windscreen_glass" ||
    name === "front_glass" ||
    name === "object_22"
  ) {
    console.log("FOUND FRONT WINDSHIELD:", name);
    return "frontWindshield";
  }

  if (
    name.includes("rear_window") ||
    name.includes("backglass") ||
    name.includes("back_glass") ||
    name.includes("rearscreen") ||
    name === "object_26_black_glass_0" ||
    name === "object_26" ||
    name === "object_25" ||
    name === "rear_windshield" ||
    name === "rearwindshield" ||
    name === "backwindow" ||
    name === "back_window"
  ) {
    console.log("FOUND REAR WINDOW:", name);
    return "rearWindow";
  }

  if (
    (name.includes("window") ||
      name.includes("glass") ||
      name.includes("side_glass") ||
      name === "object_62_window_0" ||
      name === "object_41_detail_glass_clear_0") &&
    !name.includes("front_window") &&
    !name.includes("frontwindow") &&
    !name.includes("windshield") &&
    !name.includes("windscreen") &&
    !name.includes("rear_window") &&
    !name.includes("backglass") &&
    !name.includes("back_glass") &&
    !name.includes("rearwindow")
  ) {
    console.log("FOUND SIDE WINDOW:", name);
    return "sideWindow";
  }

  console.log("UNIDENTIFIED GLASS ELEMENT:", name);
  return "other";
};
