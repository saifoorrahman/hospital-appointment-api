import { prisma } from "./lib/prisma.js";
import type { Patient } from "../../generated/prisma/client.js";

// Create a new patient
export async function createPatient(data: {
  name: string;
  phone: string;
  dateOfBirth: Date;
}): Promise<Patient> {
  return prisma.patient.create({
    data: {
      name: data.name,
      phone: data.phone,
      dateOfBirth: data.dateOfBirth,
    },
  });
}

// Get a patient by ID
export async function getPatient(id: number): Promise<Patient | null> {
  return prisma.patient.findUnique({
    where: { id },
  });
}

// Search patients by name (case-insensitive partial match)
export async function searchPatients(nameQuery: string): Promise<Patient[]> {
  return prisma.patient.findMany({
    where: {
      name: {
        contains: nameQuery,
        mode: "insensitive",
      },
    },
  });
}

// Update a patient's phone number
export async function updatePatientPhone(
  id: number,
  phone: string
): Promise<Patient> {
  return prisma.patient.update({
    where: { id },
    data: { phone },
  });
}

// Delete a patient by ID
export async function deletePatient(id: number): Promise<Patient> {
  return prisma.patient.delete({
    where: { id },
  });
}
