import { trigger, animate, style, query, transition, group } from "@angular/animations";

const duration = 300;

export const routerTransition = trigger("routerTransition", [
  transition("* <=> *", [
    query(":enter, :leave", style({ width: "100%", opacity: 0 }),
      { optional: true }),
    group([
      query(
        ":enter", [
        animate(`${duration}ms ease-in-out`, style({ opacity: 1 }))
      ], { optional: true }),
      query(
        ":leave", [
        animate(0, style({ position: "absolute", display: "none", opacity: 0 }))
      ], { optional: true })
    ])
  ])
]);
