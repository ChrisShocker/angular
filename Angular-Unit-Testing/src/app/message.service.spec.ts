import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    // ensure we have a fresh instance of the service for each test
    // Note this acts as the assert for all the tests
    service = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    service.add('message');
    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
    service.add('message1');
    service.add('message2');

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
