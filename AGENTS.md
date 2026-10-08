# Project architecture rules

- Keep scenario energy prices, emission factors, grant ceilings, and trade price bands in the central assumptions dataset; multiple calculators must not silently diverge on shared assumptions.
- Clear a calculator's result when an input that affects it changes; this prevents sharing or exporting stale figures.
- Keep calculation regression tests alongside the shared calculator logic; financial estimates need reproducible guardrails.
- Keep editorial partner articles in dedicated data modules and merge them into the common blog fallback; this keeps sourced article series maintainable without changing the public blog flow.