import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyP } from "@/components/ui/typography";
import Link from "next/link";

export default async function Home() {
  const session = false;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="card-title">Hey, I&apos;m Md Faizan</CardTitle>
      </CardHeader>
      <CardContent>
        <TypographyP className="text-lg text-gray-600 ">
          I’m building this project to teach you the secrets of{" "}
          <Link
            target="_blank"
            href="https://www.better-auth.com/"
            className="text-blue-500 font-medium"
          >
            “better-auth”
          </Link>
          .
        </TypographyP>
        <TypographyP className="text-md text-gray-500">
          If you like my work, consider supporting me with{" "}
          <Link
            target="_blank"
            href="https://buymeacoffee.com/devfaiz"
            className="font-medium text-yellow-500"
          >
            “Buy Me a Coffee”
          </Link>
          .
        </TypographyP>
      </CardContent>
      <CardFooter>
        {!session ? (
          <Link href="/sign-in" className={buttonVariants()}>
            Get Started
          </Link>
        ) : (
          <Link href="/dashboard" className={buttonVariants()}>
            Dashboard
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
