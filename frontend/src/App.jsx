import { Flex, Text, Button } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
export default function MyApp() {
	return (
		<Flex direction="column" gap="2">
			<Text>Hello from Radix Themes :)</Text>
			<Button variant="soft">Let's go</Button>
		</Flex>
	);
}
