import { trigger, transition, style, animate } from "@angular/animations";

export const optionsMenuAnimation = trigger("menuAnimation", [
	transition(":enter", [
		style({ opacity: 0, height: "0px" }),
		animate(`100ms ease-in-out`, style({ opacity: 1, height: "*" })),
	]),
	transition(":leave", [
		animate(`100ms ease-in-out`, style({ opacity: 0, height: "0px" })),
	]),
]);
