-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_technician_fkey` FOREIGN KEY (`technician`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
