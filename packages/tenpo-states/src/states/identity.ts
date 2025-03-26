import { BehaviorSubject } from 'rxjs';

const DEMO = {
  isAuthenticated: false,
};

export const authStates$ = new BehaviorSubject(DEMO);
