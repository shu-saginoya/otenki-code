"use client";

import {
  Grid,
  Col,
  Stack,
  Card,
  Button,
  Text,
  InputField,
  Divider,
  Tab,
} from "@/components/ui";
import { useAuth } from "@/hooks/features";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleEmailLogin,
    handleEmailSignup,
    handleGoogleLogin,
  } = useAuth();

  const formFields = (
    <>
      <Col cols={12}>
        <InputField
          type="email"
          label="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Col>

      <Col cols={12}>
        <InputField
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Col>
    </>
  );

  const loginContent = (
    <form onSubmit={handleEmailLogin}>
      <Grid gap={4} className="px-4 py-8">
        {formFields}
        <Col cols={12} justify="center">
          <Button type="submit" prependIcon="login">
            ログイン
          </Button>
        </Col>
      </Grid>
    </form>
  );

  const signupContent = (
    <form onSubmit={handleEmailSignup}>
      <Grid gap={4} className="px-4 py-8">
        {formFields}
        <Col cols={12} justify="center">
          <Button type="submit" prependIcon="signin">
            新規登録
          </Button>
        </Col>
      </Grid>
    </form>
  );

  return (
    <Grid gap={4}>
      <Col cols={12} justify="center">
        <Text as="h2" weight="bold" size="2xl">
          ログイン / 新規登録
        </Text>
      </Col>
      <Col cols={12}>
        <Card>
          {message && <Text className="text-warning">{message}</Text>}

          <Tab
            items={[
              { label: "ログイン", content: loginContent },
              { label: "新規登録", content: signupContent },
            ]}
            variant="paint"
          />

          <Divider text="または" />

          <Stack justify="center" gap={2} className="px-4 py-8">
            <Button onClick={handleGoogleLogin} prependIcon="google">
              Googleでログイン
            </Button>
          </Stack>
        </Card>
      </Col>
    </Grid>
  );
}
