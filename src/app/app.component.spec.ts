import { By } from '@angular/platform-browser';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: any;
  let app: any;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent]
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Hogwarts'`, () => {
    expect(app.title).toEqual('Hogwarts');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Hogwarts!');
  });

  it('should increment/decrement value', () => {
    fixture.componentInstance.Increment();
    expect(fixture.componentInstance.value).toEqual(1);

    fixture.componentInstance.Decrement();
    expect(fixture.componentInstance.value).toEqual(0);
  });

  it('should stop at 0 and show minimum message', () => {
    fixture.componentInstance.value = 0;
    fixture.debugElement.query(By.css('button.Decrement')).triggerEventHandler('click', null);

    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(fixture.componentInstance.value).toEqual(0);
    expect(message).toContain('Minimum');
  });

  it('should stop at 15 and show maximum message', () => {
    fixture.componentInstance.value = 15;
    fixture.debugElement.query(By.css('button.Increment')).triggerEventHandler('click', null);

    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('p.message')).nativeElement.innerText;

    expect(fixture.componentInstance.value).toEqual(15);
    expect(message).toContain('Maximum');
  });
});
