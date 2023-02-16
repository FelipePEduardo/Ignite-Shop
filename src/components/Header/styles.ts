
import * as Dialog from '@radix-ui/react-dialog';
import { styled } from '@stitches/react';

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const HandBagContainer = styled(Dialog.Trigger, {
  background: '$gray800',
  padding: '0.75rem',
  border: 0,
  borderRadius: 6,
  cursor: 'pointer',

  position: 'relative',

  svg:{
    color: '$gray300'
  },

  span: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,

    fontWeight: 'bold',
    color: '$white',
    
    background: '$green500',
    padding: '0.5rem',
    borderRadius: '99999999999px',
    outline: '3px solid $gray900',

    position: 'absolute',
    top: -6.5,
    right: -6.5,
  }
})

export const ShoppingBagContainer = styled(Dialog.Overlay, {
  width: 480,
  height: '100vh',

  background: '$gray800',

  position: 'fixed',
  top: 0,
  right: 0,
})

export const CloseButton = styled(Dialog.Close, {
  border: 0,
  background: "transparent",
  color: '$gray400',

  position: 'absolute',
  top: 24,
  right: 24,
  lineHeight: 0,

  cursor: 'pointer',
})

export const Content = styled(Dialog.Content, {
  width: '100%',
  maxWidth: 384,
  height: '100%',

  margin: '4.5rem auto 0',

  display: "flex",
  flexDirection: 'column',
  justifyContent: 'space-between',
})

export const CardsWrapperContainer = styled('div', {
  height: '100%',
  marginTop: '2rem',

  display: 'flex',
  flexDirection: 'column',

  gap: '2.4rem',
})

export const ProductCard = styled('div', {
  width: '100%',

  display: 'flex',
  gap: 24,

  '> div:last-child': {
    width: '100%',

    display: "flex",
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'center',

    p: {
      color: '$gray300',
      fontSize: '1.125rem',
      marginBottom: '0.8rem', 
    },

    strong: {
      marginBottom: '1rem',
    },

    button: {
      background: 'transparent',
      border: 0,
      color: '$green500',
      fontWeight: 'bold',

      cursor: 'pointer',

      '&:hover': {
        color: '$green300',
        transition: '0.2s',
      },
    }
  }

})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 100,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0% , #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const FooterContainer = styled('footer', {
  paddingBottom: '3rem',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    marginBottom: '3.5rem',

    '> div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },

  button: {
    width: '100%',
    border: 0,
    background: '$green500',
    padding: '2rem',
    marginBottom: '3rem',

    borderRadius: 8,

    color: '$white',
    fontWeight: 'bold',
    fontSize: '1.125rem',

    cursor: 'pointer',

    '&:disabled': {
      opacity: '0.7',
      cursor: 'not-allowed',
    }
  }
})