# Hospital Appointment API

A complete Node.js + Prisma CRUD module for the hospital appointment domain.

## Tech Stack

- **Node.js** with TypeScript (ESM, `"type": "module"`)
- **Prisma 7.10.0** with `@prisma/adapter-pg` (PostgreSQL)
- **dotenv** for environment configuration

## Database Models

| Model | Table | Description |
|---|---|---|
| `Patient` | `patients` | Hospital patients |
| `Doctor` | `doctors` | Doctors with specialties |
| `Appointment` | `appointments` | Appointments linking patients and doctors |

## Setup & Running

```bash
npm install
# Set DATABASE_URL in .env
npx prisma generate
npx prisma db seed
npx tsx src/test.ts
```

## CRUD Functions

### Patients (`src/patients.ts`)
- `createPatient(data)` — Create a new patient
- `getPatient(id)` — Get patient by ID
- `searchPatients(nameQuery)` — Case-insensitive partial name search
- `updatePatientPhone(id, phone)` — Update patient phone number
- `deletePatient(id)` — Delete patient by ID

### Doctors (`src/doctors.ts`)
- `createDoctor(data)` — Create a new doctor
- `getDoctor(id)` — Get doctor by ID
- `listDoctorsBySpecialty(specialty)` — List doctors filtered by specialty
- `deleteDoctor(id)` — Delete doctor by ID

### Appointments (`src/appointments.ts`)
- `bookAppointment(data)` — Book appointment with `connect` + `include`
- `getAppointmentFull(id)` — Get appointment with full Patient and Doctor details
- `getDoctorUpcomingAppointments(doctorId)` — Get all upcoming appointments for a doctor
- `setAppointmentStatus(id, status)` — Update appointment status
- `cancelAllPatientAppointments(patientId)` — Batch cancel all appointments for a patient
- `deleteAppointment(id)` — Delete an appointment by ID
