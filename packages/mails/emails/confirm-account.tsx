import { Button } from "@react-email/button";
import { Container } from "@react-email/container";
import { Font } from "@react-email/font";
import { Head } from "@react-email/head";
import { Heading } from "@react-email/heading";
import { Html } from "@react-email/html";
import { Preview } from "@react-email/preview";
import { Section } from "@react-email/section";
import { Tailwind } from "@react-email/tailwind";
import { Text } from "@react-email/text";

interface Props {
    confirmUrl: string;
}

const ConfirmAccount = ({ confirmUrl }: Props) => {
    return (
        <Tailwind>
            <Preview>Welcome to nonogram.world!</Preview>
            <Html lang="en" dir="ltr" className="bg-slate-100">
                <Head>
                    <title>Confirm your account</title>
                    <Font
                        fontFamily="Montserrat"
                        fallbackFontFamily="Verdana"
                        webFont={{
                            url: "https://fonts.gstatic.com/s/nunito/v25/XRXV3I6Li01BKofIOOaBTMnFcQIG.woff2",
                            format: "woff2"
                        }}
                        fontWeight={400}
                        fontStyle="normal"
                    />
                </Head>
                <Container className="text-center">
                    <Text>nonogram.world</Text>
                    <Section className="rounded-xl bg-white p-8">
                        <Heading as="h1">Welcome to nonogram.world!</Heading>
                        <Text>
                            Thank you for signing up, it&apos;s awesome to have
                            you 💌
                        </Text>
                        <Text>
                            Before you can login to your account, you need to
                            confirm your account by pressing the button below.
                        </Text>
                        <Button
                            pX={16}
                            pY={8}
                            href={confirmUrl}
                            className="rounded-md bg-slate-900 font-medium text-white"
                        >
                            Confirm your account
                        </Button>
                        <Text>We hope you have a ton of fun on our site!</Text>
                    </Section>
                </Container>
            </Html>
        </Tailwind>
    );
};

export default ConfirmAccount;
