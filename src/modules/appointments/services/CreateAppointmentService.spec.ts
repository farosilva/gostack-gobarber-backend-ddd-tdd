import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to a create new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    await expect(appointment).toHaveProperty('id');
    await expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 23, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123123123',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
