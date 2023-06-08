import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { TitlePipe } from './pipes/title.pipe';
import { ValuePipe } from './pipes/value.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent,
    TitlePipe,
    ValuePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
