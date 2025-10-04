// src/modules/appointment/appointment.test.ts
import { hasScheduleConflict } from '../modules/appointment/appointment.service';

describe('Scheduling Overlaps', () => {
  const existingAppointments = [
    {
      startTime: new Date('2025-10-05T10:00:00Z'),
      endTime: new Date('2025-10-05T12:00:00Z'),
    },
  ];

  it('should detect an overlapping appointment', () => {
    const newAppt = {
      startTime: new Date('2025-10-05T11:00:00Z'),
      endTime: new Date('2025-10-05T13:00:00Z'),
    };
    expect(hasScheduleConflict(existingAppointments, newAppt)).toBe(true);
  });

  it('should allow non-overlapping appointment', () => {
    const newAppt = {
      startTime: new Date('2025-10-05T12:30:00Z'),
      endTime: new Date('2025-10-05T13:30:00Z'),
    };
    expect(hasScheduleConflict(existingAppointments, newAppt)).toBe(false);
  });
});
