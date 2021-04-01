## Store rules

1. By extension of the definition of the global store, reducers are also global and we want to keep
   them in one place (contrary to some practices, where reducers are kept close to the components).
2. All reducers should be typed.
3. The store is merely a combination of distinct store slices, every slice has its own key.
4. Action names should describe events that occured rather than look like setters.
5. Every action must obey the interface { type: string; payload?: PayloadType }. The payload should be strongly typed.
6. Action helpers are using [typesafe-actions](https://github.com/piotrwitek/typesafe-actions#using-action-creators-instances-instead-of-type-constants) library
