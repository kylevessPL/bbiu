import {EventEmitter} from '@angular/core';

import {ObjectUnsubscribedError} from 'rxjs';

// noinspection JSDeprecatedSymbols
export class BehaviorEventEmitter<T> extends EventEmitter<T> {
    private cached?: T;

    get value(): T {
        if (this.hasError) {
            throw this.thrownError;
        } else if (this.closed) {
            throw ObjectUnsubscribedError;
        }
        return this.cached;
    }

    emit(value?: T) {
        this.cached = value;
        super.emit(value);
    }
}
