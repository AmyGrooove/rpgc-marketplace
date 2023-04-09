import {
  AVATAR_1,
  AVATAR_2,
  AVATAR_3,
  AVATAR_4,
  AVATAR_5,
  AVATAR_6,
  AVATAR_7,
} from '../../theme/sources'

export const getAvatar = (id?: string) => {
  const numberedId = (id || ' ').charCodeAt(0)

  switch (true) {
  case numberedId >= 113:
    return AVATAR_1
  case numberedId >= 103:
    return AVATAR_2
  case numberedId >= 88:
    return AVATAR_3
  case numberedId >= 78:
    return AVATAR_4
  case numberedId >= 68:
    return AVATAR_5
  case numberedId >= 54:
    return AVATAR_6
  default:
    return AVATAR_7
  }
}
