import Link from 'next/link';
import React from 'react';

interface Props {
  messageBefore?: string;
  messageAfter?: string;
  linkName?: string;
  linkPath?: string;
}

const LoginSuggestion = ({ messageBefore = '', messageAfter, linkName = 'Log in', linkPath = '/login' }: Props) => {
  return (
    <div className={'classes.logInSuggestion'}>
      *{messageBefore !== '' ? `${messageBefore} ` : ''}
      <Link href={`${linkPath}`} className="text-[var(--text-color-primary)]  hover:brightness-[80%]">
        {linkName}
      </Link>
      {messageAfter != null ? messageAfter : 'to save your race stats!'}
    </div>
  );
};

export default LoginSuggestion;
