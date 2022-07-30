
import { Output, EventEmitter, Component } from "@angular/core";
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-animated',
  template: ``,
})
export abstract class AnimatedComponent {
  @Output() animationStarted = new EventEmitter<AnimationEvent>();
  @Output() animationFinished = new EventEmitter<AnimationEvent>();

  public onAnimationStart(event: AnimationEvent): void {
    this.animationStarted.emit(event);
  }

  public onAnimationFinish(event: AnimationEvent): void {
    this.animationFinished.emit(event);
  }
}
