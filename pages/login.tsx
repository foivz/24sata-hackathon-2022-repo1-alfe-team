import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react"
import { useRouter } from "next/router";
import { BsFacebook, BsGoogle, BsTwitter } from "react-icons/bs";

export default function Login({ providers }: { providers: any }) {
    const { data: session } = useSession()
    const router = useRouter()
    if (session) {
        router.push("/")
        return (
        <>
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>
        )
    }
    return (
        <>
            <Stack alignItems={'center'} p={4} justifyContent='center' style={{height: '100vh'}}>
                <Stack alignItems={'center'} spacing={-1}>
                    <svg width="32" viewBox="0 0 1205 1301" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1042.82 51C1003.66 253.318 902.471 406.086 796.793 578.975C686.97 758.647 563.017 931.009 422.601 1087.91C373.648 1142.61 321.856 1193.59 255.321 1226.85C222.882 1243.07 144.165 1263.03 109.145 1241.77C41.6928 1200.83 51.4974 1077.88 51.4974 1009.69C51.4974 893.506 135.696 853.943 246.571 848.109C398.49 840.115 487.137 901.91 600.175 995.798C706.163 1083.83 840.766 1138.15 959.955 1203.69C1004.53 1228.21 1106.86 1258.78 1154 1227.37" stroke="black" stroke-width="100" stroke-linecap="round"></path></svg>
                    <Text fontWeight={'light'} fontSize={'xxx-large'}>FINANCE</Text>
                </Stack>
                <Heading fontSize={'lg'} p={4}>Login</Heading>
                {Object.values(providers).map((provider) => (
                    <div key={(provider as any).name}>
                    <Button w={'190px'} onClick={() => signIn((provider as any).id)}>
                        <BsGoogle /><span style={{padding: 4}}></span>
                        {(provider as any).name}
                    </Button>
                    </div>
                ))}
                <Button w={'190px'}>
                    <BsTwitter /><span style={{padding: 4}}></span>
                    Twitter
                </Button>
                <Button w={'190px'}>
                    <BsFacebook /><span style={{padding: 4}}></span>
                    Facebook
                </Button>
            </Stack>
        </>
    )
}
export async function getServerSideProps(context: any) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
}