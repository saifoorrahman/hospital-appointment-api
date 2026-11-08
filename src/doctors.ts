import { prisma } from "./lib/prisma.js";
import type { Doctor } from "../../generated/prisma/client.js";

// Create a new doctor
export async function createDoctor(data: {
  name: string;
  specialty: string;
}): Promise<Doctor> {
  return prisma.doctor.create({
    data: {
      name: data.name,
      specialty: data.specialty,
    },
  });
}

// Get a doctor by ID
export async function getDoctor(id: number): Promise<Doctor | null> {
  return prisma.doctor.findUnique({
    where: { id },
  });
}

// List all doctors by specialty
export async function listDoctorsBySpecialty(
  specialty: string
): Promise<Doctor[]> {
  return prisma.doctor.findMany({
    where: {
      specialty: {
        equals: specialty,
        mode: "insensitive",
      },
    },
  });
}

// Delete a doctor by ID
export async function deleteDoctor(id: number): Promise<Doctor> {
  return prisma.doctor.delete({
    where: { id },
  });
}
