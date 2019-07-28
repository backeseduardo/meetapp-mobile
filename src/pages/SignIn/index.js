import React from 'react';

import Background from '~/components/Background';
import Input from '~/components/Input';
import Button from '~/components/Button';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Input placeholder="Call" style={{ marginTop: 30 }} />
      <Button>Entrar</Button>
    </Background>
  );
}
