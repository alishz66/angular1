import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: String;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        } else {
          return [...acc, value];
        }
      }, [])
    );
  }

  addSuccess(message: String) {
    const id = this.randomId();
    this.messagesInput.next({
      id: id,
      text: message,
      type: 'success',
    });
    setTimeout(() => {
      this.clearMessages(id);
    }, 5000);
  }

  addError(message: String) {
    const id = this.randomId();
    this.messagesInput.next({
      id: id,
      type: 'error',
      text: message,
    });
    setTimeout(() => {
      this.clearMessages(id);
    }, 5000);
  }

  clearMessages(id: number) {
    this.messagesInput.next({
      id: id,
      type: 'clear',
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
