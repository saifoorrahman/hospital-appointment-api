import { prisma } from "./lib/prisma.js";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients.js";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors.js";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments.js";

async function main() {
  // Clean up before tests
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  console.log("--- Patients ---");

  const patient = await createPatient({
    name: "Carol White",
    phone: "555-2001",
    dateOfBirth: new Date("1992-07-04"),
  });
  console.log("Created patient:", patient);

  const fetched = await getPatient(patient.id);
  console.log("Fetched patient:", fetched);

  const results = await searchPatients("carol");
  console.log("Search 'carol':", results);

  const updated = await updatePatientPhone(patient.id, "555-9999");
  console.log("Updated phone:", updated);

  console.log("\n--- Doctors ---");

  const doctor = await createDoctor({
    name: "Dr. Susan Lee",
    specialty: "Cardiology",
  });
  console.log("Created doctor:", doctor);

  const fetchedDoc = await getDoctor(doctor.id);
  console.log("Fetched doctor:", fetchedDoc);

  const cardiologists = await listDoctorsBySpecialty("Cardiology");
  console.log("Cardiologists:", cardiologists);

  console.log("\n--- Appointments ---");

  const appt = await bookAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date("2027-03-15T10:00:00Z"),
  });
  console.log("Booked appointment:", appt);

  const fullAppt = await getAppointmentFull(appt.id);
  console.log("Full appointment:", fullAppt);

  const upcomingAppts = await getDoctorUpcomingAppointments(doctor.id);
  console.log("Doctor upcoming appointments:", upcomingAppts);

  const statusUpdated = await setAppointmentStatus(appt.id, "completed");
  console.log("Updated appointment status:", statusUpdated);

  // Create another appointment to test cancelAllPatientAppointments
  const appt2 = await bookAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date("2027-04-20T11:00:00Z"),
  });
  console.log("Booked second appointment:", appt2);

  const cancelCount = await cancelAllPatientAppointments(patient.id);
  console.log("Cancelled all patient appointments:", cancelCount);

  await deleteAppointment(appt.id);
  console.log("Deleted appointment:", appt.id);
  await deleteAppointment(appt2.id);
  console.log("Deleted appointment:", appt2.id);

  // Cleanup
  await deletePatient(patient.id);
  console.log("Deleted patient:", patient.id);
  await deleteDoctor(doctor.id);
  console.log("Deleted doctor:", doctor.id);

  console.log("\n✅ All CRUD operations completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
