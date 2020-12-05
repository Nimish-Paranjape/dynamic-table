import { ioSaga } from './IOSaga';

export function* watchIOSaga() {
    yield ioSaga();
}
