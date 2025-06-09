import * as THREE from "three";

// Material cache to prevent memory leaks and improve performance
class MaterialCache {
  private static instance: MaterialCache;
  private materials: Map<string, THREE.MeshPhysicalMaterial> = new Map();

  static getInstance(): MaterialCache {
    if (!MaterialCache.instance) {
      MaterialCache.instance = new MaterialCache();
    }
    return MaterialCache.instance;
  }

  private createMaterial(
    key: string,
    params: ConstructorParameters<typeof THREE.MeshPhysicalMaterial>[0]
  ): THREE.MeshPhysicalMaterial {
    const material = new THREE.MeshPhysicalMaterial(params);
    this.materials.set(key, material);
    return material;
  }

  getMaterial(key: string, params?: ConstructorParameters<typeof THREE.MeshPhysicalMaterial>[0]): THREE.MeshPhysicalMaterial {
    if (this.materials.has(key)) {
      return this.materials.get(key)!;
    }
    
    if (!params) {
      throw new Error(`Material ${key} not found and no params provided`);
    }
    
    return this.createMaterial(key, params);
  }

  getCarPaintMaterial(color: THREE.Color): THREE.MeshPhysicalMaterial {
    const key = `car_paint_${color.getHexString()}`;
    return this.getMaterial(key, {
      color: color.clone(),
      metalness: 0.6,
      roughness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      envMapIntensity: 1.0,
    });
  }

  getPPFMaterial(color: THREE.Color): THREE.MeshPhysicalMaterial {
    const key = `ppf_${color.getHexString()}`;
    return this.getMaterial(key, {
      color: color.clone(),
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
  }

  dispose(): void {
    this.materials.forEach(material => material.dispose());
    this.materials.clear();
  }
}

// Pre-loaded constants for optimal performance (created at module load time)
const BODY_PART_KEYWORDS = new Set([
  'body', 'bumper', 'fender', 'hood', 'door', 'side', 'trunk', 'rearwing' , 'steps_part_object016001'
]);

const FRONT_PARTS_MAP = {
  SUV: new Set([
    'fender_front_part_object011003',
    'rear_view_mirror_body', 
    'fender_front_part_object011003-2',
    'fender_front_part_object012001',
    'fender_front_part_object015002',
    'body_part'
  ]),
  PICKUP: new Set([
    'body_front_wing-2',
    'body_part3',
    'bumper_part_f2', 
    'body_front_wing-3'
  ]),
  SEDAN: new Set([
    'carpaint_front-1',
    'carpaint_front-2',
    'doorfrright-carpaint-1',
    'doorfrleft-carpaint-1'
  ])
} as const;

const PARTIAL_FRONT_PARTS_MAP = {
  SUV: new Set(['fender_front_part_object011003', 'hood']),
  PICKUP: new Set(['body_front_wing-2', 'body_part3', 'bumper_part_f2']),
  SEDAN: new Set(['carpaint_front-2'])
} as const;

export const isBodyPart = (name: string): boolean => {
  const lowerName = name.toLowerCase();
  return Array.from(BODY_PART_KEYWORDS).some(keyword => lowerName.includes(keyword));
};

const isFrontPart = (name: string, vehicleType: "SEDAN" | "SUV" | "PICKUP"): boolean => {
  const lowerName = name.toLowerCase();
  return Array.from(FRONT_PARTS_MAP[vehicleType]).some(part => lowerName.includes(part));
};

const isPartialFrontPart = (name: string, vehicleType: "SEDAN" | "SUV" | "PICKUP"): boolean => {
  const lowerName = name.toLowerCase();
  return Array.from(PARTIAL_FRONT_PARTS_MAP[vehicleType]).some(part => lowerName.includes(part));
};

const shouldApplyPPF = (name: string, option: string, vehicleType: "SEDAN" | "SUV" | "PICKUP"): boolean => {
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

// Pre-defined materials with singleton pattern
const BLACK_COLOR = new THREE.Color("#2F2F2F");

const getSpecialMaterials = (() => {
  let materials: Map<string, THREE.MeshPhysicalMaterial> | null = null;
  
  return () => {
    if (materials) return materials;
    
    materials = new Map([
      ['plastic', new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("black"),
        metalness: 0.6,
        roughness: 0.2,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 1.0,
      })],
      ['carbon', new THREE.MeshPhysicalMaterial({
        color: BLACK_COLOR,
        metalness: 1.0,
        roughness: 0.4,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 1.2,
      })],
      ['cardinal', new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#8C1D40"),
        metalness: 1.0,
        roughness: 0.4,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 1.2,
      })],
      ['matt', new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#8A8D8F"),
        metalness: 0.6,
        roughness: 0.2,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 1.0,
      })],
      ['black', new THREE.MeshPhysicalMaterial({
        color: BLACK_COLOR,
        metalness: 0.8,
        roughness: 0.3,
        clearcoat: 0.7,
        clearcoatRoughness: 0.1,
        reflectivity: 1.0,
        envMapIntensity: 1.2,
      })]
    ]);
    
    return materials;
  };
})();

// Optimized material rules with regex patterns for better performance
const MATERIAL_RULES = [
  { pattern: /body-plasticnumber/i, material: 'plastic' },
  { pattern: /bumper_front_part_024/i, material: 'matt' },
  { pattern: /body-carbon|detail_rear_bumper_edge/i, material: 'carbon' },
  { pattern: /logo_rear|logo_rear_DENAIL_text|logo_rear_part|logo_front_part/i, material: 'cardinal' },
  { 
    pattern: /doorfrleft-metaldark|body-plasticblack|body-glasslights|glasslights|metaldark|body-black|body-rubber|intburmestergrid|logo_side02|bumper_part_f1|bumper_part_f3|bumper_part_f4|detail_fastener|body_front_bumper_part1|body_front_bumper|halogen_body05|body_part5|side_backward_mirror|detail_door_handle_side|body_rear_wing_part|body_front_wing_part|body_parts_underbody|detail_antenna_part|bumper_front_part_014|bumper_front_part_028|bumper_front_part_018|bumper_front_part_006|bumper_front_part_009|bumper_front_part_031|bumper_front_part_015|tire_wheel_trunk_005001|tire_wheel_trunk_007004|tire_wheel_trunk_009005|tire_wheel_trunk_004003|tire_wheel_trunk_01002|trunk_handle|door_handle|roof|cleaner|hood_grill_part_object003001|hood_grill_part_object005003|hood_grid|hood_grill_part_object055002|rear_view_mirror_body|hood_part_03|bumper_rear_part_object036001|pipe|bumper_rear_part_torus002005|bumper_rear_part_object044003|bumper_rear_part_object043006|bumper_front_part_024|trunk_part|door_part/i, 
    material: 'black' 
  }
];

const getCustomMaterial = (name: string): THREE.MeshPhysicalMaterial | null => {
  const materials = getSpecialMaterials();
  
  for (const rule of MATERIAL_RULES) {
    if (rule.pattern.test(name)) {
      return materials.get(rule.material) || null;
    }
  }
  return null;
};

// Batch operations to reduce scene traversals
const processBodyParts = (
  scene: THREE.Group,
  processor: (mesh: THREE.Mesh) => void
): void => {
  const meshes: THREE.Mesh[] = [];
  
  // Single traversal to collect all meshes
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && isBodyPart(child.name)) {
      meshes.push(child);
    }
  });
  
  // Process collected meshes
  meshes.forEach(processor);
};

export const resetBodyKitParts = (
  scene: THREE.Group,
  originalGeometries: Map<string, THREE.BufferGeometry>,
  carColor: THREE.Color,
  vehicleType: "SEDAN" | "SUV" | "PICKUP"
): void => {
  const materialCache = MaterialCache.getInstance();
  
  processBodyParts(scene, (mesh) => {
    const originalGeometry = originalGeometries.get(mesh.name);
    if (originalGeometry) {
      // Dispose old geometry if it's different
      if (mesh.geometry !== originalGeometry) {
        mesh.geometry.dispose();
      }
      mesh.geometry = originalGeometry;

      // Dispose old material if it's not cached
      if (mesh.material instanceof THREE.MeshPhysicalMaterial) {
        const specialMaterial = getCustomMaterial(mesh.name);
        if (!specialMaterial) {
          mesh.material.dispose();
        }
      }

      const customMaterial = getCustomMaterial(mesh.name);
      mesh.material = customMaterial || materialCache.getCarPaintMaterial(carColor);
    }
  });
};

export const applyBodyKit = (
  scene: THREE.Group,
  option: string,
  originalGeometries: Map<string, THREE.BufferGeometry>,
  carColor: THREE.Color,
  vehicleType: "SEDAN" | "SUV" | "PICKUP"
): void => {
  if (option === "none") return;
  
  const materialCache = MaterialCache.getInstance();
  let modifiedParts = 0;
  
  processBodyParts(scene, (mesh) => {
    const customMaterial = getCustomMaterial(mesh.name);
    if (customMaterial) {
      mesh.material = customMaterial;
      return;
    }

    if (shouldApplyPPF(mesh.name, option, vehicleType)) {
      // Dispose old material if it's not a special material
      if (mesh.material instanceof THREE.MeshPhysicalMaterial && !getCustomMaterial(mesh.name)) {
        mesh.material.dispose();
      }
      
      mesh.material = materialCache.getPPFMaterial(carColor);
      modifiedParts++;
    }
  });
  
  console.log(`Applied ${option} PPF to ${modifiedParts} parts`);
};

// Cleanup function to dispose resources
export const disposeBodyKitResources = (): void => {
  MaterialCache.getInstance().dispose();
  const materials = getSpecialMaterials();
  materials.forEach(material => material.dispose());
  materials.clear();
};