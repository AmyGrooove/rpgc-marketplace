import './index.scss'
import { RPGC_LOGO_DARK, SOCIALNETWORKICONS } from '../../theme/sources'
import { Icon } from '../common'

const Footer = () => {
  return (
    <div className={'footer-container'}>
      <div className={'left'}>
        <div className={'logo'}>
          <img src={RPGC_LOGO_DARK} alt="" />
          RPGC
        </div>
        <div className={'docs'}>
          <a
            href={'#'}
          >
            Legal Documents
          </a>
          <span className={'divider'} />
          <a
            href={'#'}
          >
            Privacy Policy
          </a>
          <span className={'divider'} />
          <a
            href={'#'}
          >
            Cookies
          </a>
        </div>
      </div>
      <div className={'right'}>
        <div className={'help'}>
          <Icon icon="helpIcon" />
          Help
        </div>
        <div className={'social-icons'}>
          {SOCIALNETWORKICONS.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon={item.name} />
            </a>
          ),
          )}
        </div>
      </div>
    </div>
  )
}

export default Footer
