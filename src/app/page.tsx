import Image from "next/image";
import Flex from "@/components/layout/Flex";
import List from "@/components/atoms/List";
import ListItem from "@/components/atoms/ListItem";

export default function Home() {
  return (
    <main>
      <List>
        <ListItem>アイテム</ListItem>
        <ListItem>アイテム</ListItem>
        <ListItem>アイテム</ListItem>
      </List>
      <Flex>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </Flex>
      <Flex className="gap-inline bg-background">
        <p className="text-foreground-light">text-foreground-light</p>
        <p className="text-foreground">text-foreground</p>
        <p className="text-foreground-dark">text-foreground-dark</p>
        <p className="text-disabled">text-disabled</p>
        <p className="text-link">text-link</p>
        <p className="text-success">text-success</p>
        <p className="text-error">text-error</p>
        <p className="text-warning">text-warning</p>
      </Flex>
      <Flex className="flex-col gap-container bg-foreground">
        <p className="text-background-light">text-background-light</p>
        <p className="text-background">text-background</p>
        <p className="text-background-dark">text-background-dark</p>
        <p className="text-disabled">text-disabled</p>
        <p className="text-link">text-link</p>
        <p className="text-success">text-success</p>
        <p className="text-error">text-error</p>
        <p className="text-warning">text-warning</p>
      </Flex>
    </main>
  );
}
