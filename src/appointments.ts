import { prisma } from "./lib/prisma.js";
import type { Appointment, Patient, Doctor } from "../../generated/prisma/client.js";

type AppointmentFull = Appointment & {
  Patient: Patient;
  Doctor: Doctor;
};

// Book a new appointment using connect + include
export async function bookAppointment(data: {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
}): Promise<AppointmentFull> {
  return prisma.appointment.create({
    data: {
      Patient: { connect: { id: data.patientId } },
      Doctor: { connect: { id: data.doctorId } },
      appointmentDate: data.appointmentDate,
    },
    include: {
      Patient: true,
      Doctor: true,
    },
  });
}

// Get a full appointment by ID (includes patient and doctor)
export async function getAppointmentFull(
  id: number
): Promise<AppointmentFull | null> {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      Patient: true,
      Doctor: true,
    },
  });
}

// Get all upcoming appointments for a specific doctor (future dates, ordered by date asc)
export async function getDoctorUpcomingAppointments(
  doctorId: number
): Promise<AppointmentFull[]> {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      appointmentDate: {
        gte: new Date(),
      },
    },
    include: {
      Patient: true,
      Doctor: true,
    },
    orderBy: { appointmentDate: "asc" },
  });
}

// Update the status of an appointment (e.g. "scheduled", "completed", "cancelled")
export async function setAppointmentStatus(
  id: number,
  status: string
): Promise<Appointment> {
  return prisma.appointment.update({
    where: { id },
    data: { status },
  });
}

// Cancel all appointments for a patient (batch update status to "cancelled")
export async function cancelAllPatientAppointments(
  patientId: number
): Promise<{ count: number }> {
  return prisma.appointment.updateMany({
    where: { patientId },
    data: { status: "cancelled" },
  });
}

// Delete an appointment by ID
export async function deleteAppointment(id: number): Promise<Appointment> {
  return prisma.appointment.delete({
    where: { id },
  });
}
