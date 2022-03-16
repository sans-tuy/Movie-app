import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function navigateHome(name) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}

// add other navigation functions that you need and export them
