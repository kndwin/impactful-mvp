import tw from "tailwind-styled-components";
import { signIn } from "next-auth/react";
import { Button } from "common/ui";
import { Logo } from "common/svg";

export default function HomePage() {
  return (
    <StyledContainer>
      <StyledHeader>
        <div className="flex items-center gap-2">
          <Logo size={32} />
          <p className="px-2 py-1 text-xs font-bold rounded bg-zinc-200 text-zinc-700">
            BETA
          </p>
        </div>
        <Button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        >
          Sign in
        </Button>
      </StyledHeader>

      <StyledMain></StyledMain>

      <StyledFooter></StyledFooter>
    </StyledContainer>
  );
}

const StyledContainer = tw.div`w-full h-full min-h-screen bg-stone-100`;
const StyledHeader = tw.header`container mx-auto py-4 flex justify-between`;
const StyledMain = tw.main`container mx-auto`;
const StyledFooter = tw.footer`container mx-auto`;
