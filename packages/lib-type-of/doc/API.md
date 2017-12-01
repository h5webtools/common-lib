# API

```javascript
import typeOf from '@jyb/lib-type-of'
```

## 调用

```javascript
function noop() {}

typeOf(new Date) == 'date'
typeOf({}) == 'object'
typeOf(null) == 'null'
typeOf(undefined) == 'undefined'
typeOf("hey") == 'string'
typeOf(true) == 'boolean'
typeOf(false) == 'boolean'
typeOf(12) == 'number'
typeOf(noop) == 'function'
typeOf(/asdf/) == 'regexp'
typeOf((function(){ return arguments })()) == 'arguments'
typeOf([]) == 'array'
typeOf(document.createElement('div')) == 'element'
```

