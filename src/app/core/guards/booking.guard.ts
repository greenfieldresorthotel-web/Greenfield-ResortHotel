import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const bookingGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const roomId = route.queryParamMap.get('roomId');

  if (!roomId) {
    router.navigate(['/rooms'], {
      queryParams: { message: 'Please select a room to proceed with your booking.' }
    });
    return false;
  }

  return true;
};
