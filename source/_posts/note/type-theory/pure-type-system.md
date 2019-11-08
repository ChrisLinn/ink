---
title: Pure type system
---

# Pure type system

``` js
(s1, s2) in axioms
---------------------- (axiom)
ctx_empty |- s1 : s2

there exist s1, s2 in sorts
(s1, s2, s3) in rules
ctx |- A: s1
ctx, x: A |- B: s2
------------------------ (pi abstraction)
ctx |- (x: A) -> B : s3

there exist A
ctx |- f: (x: A) -> B
ctx |- a: A
------------------------ (lambda application)
ctx |- f(a) : subst(B, x, a)

there exist s1, s2 in sorts
ctx |- A: s1
ctx, x: A |- b: B
ctx, x: A |- B: s2
---------------------------------- (lambda abstraction)
ctx |- (x: A) => b : (x: A) -> B

there exist B2
ctx |- A: B2
beta_reduction(B2, B1)
there exist s in sorts
ctx |- B1: s
---------------------- (conversion)
ctx |- A: B1
```