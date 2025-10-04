import { PrismaClient } from '@prisma/client';
import { hasScheduleConflict } from '../../src/modules/appointment/appointment.service';

const prisma = new PrismaClient();

describe('Integration: Appointment Conflicts', () => {
  let technicianId: string;
  let jobId1: string;
  let jobId2: string;

  beforeAll(async () => {
        await prisma.appointment.deleteMany();
        await prisma.invoiceLineItem.deleteMany();
        await prisma.payment.deleteMany();
        await prisma.invoice.deleteMany();
        await prisma.jobStatusHistory.deleteMany();
        await prisma.job.deleteMany();
        await prisma.customer.deleteMany();
        await prisma.user.deleteMany();


    const technician = await prisma.user.create({
      data: {
        name: 'Taylor',
        email: 'taylor@example.com',
        password: '$2b$10$jv.pVdWibIKVOsVlv3.CDeCGjJ2W98SnCEZdf.Kad0mtzx/0HpQou',
        role: 'technician',
      },
    });
    technicianId = technician.id;

    const customerA = await prisma.customer.create({
      data: {
        name: 'John Doe',
        phone: '1234567890',
        email: 'john@example.com',
        address: '123 Main St',
      },
    });

    const customerB = await prisma.customer.create({
      data: {
        name: 'Jane Doe',
        phone: '9876543210',
        email: 'jane@example.com',
        address: '456 Elm St',
      },
    });

    const job1 = await prisma.job.create({
      data: {
        title: 'Test Job 1',
        description: 'Job for overlap test',
        customerId: customerA.id,
      },
    });

    const job2 = await prisma.job.create({
      data: {
        title: 'Test Job 2',
        description: 'Another job for overlap test',
        customerId: customerB.id,
      },
    });

    jobId1 = job1.id;
    jobId2 = job2.id;


    await prisma.appointment.create({
      data: {
        jobId: jobId1,
        technician: technicianId,
        startTime: new Date('2025-10-05T10:00:00Z'),
        endTime: new Date('2025-10-05T12:00:00Z'),
      },
    });
  });

  it('should not allow overlapping appointments for same technician', async () => {
    const existingAppointments = await prisma.appointment.findMany({
      where: { technician: technicianId },
    });

    const conflict = hasScheduleConflict(existingAppointments, {
      startTime: new Date('2025-10-05T11:00:00Z'),
      endTime: new Date('2025-10-05T13:00:00Z'),
    });

    expect(conflict).toBe(true);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});
