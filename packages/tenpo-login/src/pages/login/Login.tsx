import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { Button, Input, Card } from '@tenpo/ui';
import { identity } from '@tenpo/services';
import { account$, preferences$, setLocaleUser } from '@tenpo/states';
import tenpoImg from '../../../src/assets/images/tenpo-blanco.png';
import css from './login.module.scss';

export default function Login() {
  const navigate = useNavigate();
  const {
    i18n: { changeLanguage },
    t,
  } = useTranslation();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userRef = useRef(user);
  const passwordRef = useRef(password);

  const handleLogin = useCallback(async () => {
    const regexEmail = /\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const isEmailValid = regexEmail.test(userRef.current);
    if (!isEmailValid) {
      setError(t('login.error-email'));
    } else {
      identity
        .login({
          user: userRef.current,
          password: passwordRef.current,
        })
        .then((response) => {
          if (response?.status !== 200) {
            setError(t('login.error-password'));
          }
        });
    }
  }, []);

  useEffect(() => {
    userRef.current = user;
    passwordRef.current = password;
  }, [user, password]);

  useEffect(() => {
    const accountSubscription = account$.subscribe(({ permissions }) => {
      if (permissions?.length > 0) navigate('/home/list');
    });

    const preferencesSubscription = preferences$.subscribe(({ locale }) => {
      changeLanguage(locale);
    });
    return () => {
      accountSubscription.unsubscribe();
      preferencesSubscription.unsubscribe();
    };
  }, []);

  return (
    <main className={cx(css.login)}>
      <div className={cx(css.login_content)}>
        <div className={cx(css.box)}>
          <img
            className={cx(css.box_input, css.box_input__logo)}
            decoding="async"
            width="150"
            src={tenpoImg}
            alt="Tenpo"
            title="Tenpo"
          ></img>
          <Input
            className={cx(css.box_input)}
            placeholder={t('login.enter-email')}
            value={user}
            onChange={(input) => {
              if (error) setError('');
              setUser(input?.target?.value);
            }}
          />
          <Input
            type="password"
            className={cx(css.box_input)}
            placeholder={t('login.enter-password')}
            value={password}
            onChange={(input) => {
              if (error) setError('');
              setPassword(input?.target?.value);
            }}
          />
          {error && <Card className={cx(css.box_input)}>{error}</Card>}
          <Button
            className={cx(css.box_input, css.box_input__btn)}
            variant="secondary"
            onClick={handleLogin}
          >
            {t('login.button-login')}
          </Button>
          <section className={cx(css.box_footer)}>
            <a className={cx(css.box_footer, css.box_footer__link)}>
              {t('login.forgot-password')}
            </a>
            <div className={cx(css.lang)}>
              <a
                className={cx(css.box_footer, css.box_footer__link)}
                onClick={() => setLocaleUser('en')}
              >
                EN
              </a>
              <div className={cx(css.box_footer, css.box_footer__space)}>|</div>
              <a
                className={cx(css.box_footer, css.box_footer__link)}
                onClick={() => setLocaleUser('es')}
              >
                ES
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
