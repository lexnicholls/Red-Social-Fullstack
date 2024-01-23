import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NotFoundComponent } from "./not-found/not-found.component";
// import { authGuard } from "./guard/auth.guard";

export const routes: Routes = [
    {path: 'signin', component: SignInComponent},
    {path: 'signup', component: SignUpComponent},
    {path: 'landingpage', component: LandingPageComponent},
    {path: '', redirectTo: '/signin', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}