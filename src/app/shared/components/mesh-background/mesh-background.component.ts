import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mesh-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mesh-flow">
      <ng-content />
    </div>
  `,
  styles: [],
})
export class MeshBackgroundComponent {}
