import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have messages', () => {
    expect(service.messages).toBeTruthy();
  });

  describe('messages methods', () => {
    beforeEach(() => {
      service.add('Test Message');
    });

    it('add method should add a message', () => {
      expect(service.messages).toContain('Test Message');
    });

    it('clear method should clear all messages', () => {
      service.clear();
      expect(service.messages).toEqual([]);
    });
  });
});
