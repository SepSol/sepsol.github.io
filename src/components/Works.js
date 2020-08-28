import React, { useState } from 'react';

import { useMediaQuery } from 'beautiful-react-hooks';
import ConditionalWrapper from './ConditionalWrapper';

import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Picture } from 'react-responsive-picture';

import Fade from 'react-reveal/Fade';
import Data from '../database/works.json';

import { VscGithub as GitHub, VscGlobe as Globe } from 'react-icons/vsc';
import {
  SiGitlab as GitLab,
  SiAndroid as Android,
  SiYoutube as YouTube
} from 'react-icons/si';

import './Works.css';

function Works() {
  const [selectedLink, setSelectedLink] = useState(null);
  const largerThan1234 = useMediaQuery('(min-width: 1234px)');
  const largerThan1060 = useMediaQuery('(min-width: 1060px)');
  const largerThan720 = useMediaQuery('(min-width: 720px)');

  const linkMaps = {
    website: <Globe fill="#aaa" size={20} />,
    github: <GitHub fill="#aaa" size={20} />,
    gitlab: <GitLab fill="#aaa" size={20} />,
    apk: <Android fill="#aaa" size={20} />,
    youtube: <YouTube fill="#aaa" size={20} />
  };

  return Data.map(work => (
    <div className="work-card-container">
      <ConditionalWrapper
        condition={largerThan720}
        wrapper={children => (
          <Fade bottom fraction={0.05} distance="70px">
            {children}
          </Fade>
        )}
      >
        <div className="work-card">
          <ul className="work-links">
            {work.links.map(link => (
              <li>
                {largerThan1060 ? (
                  <span
                    className={`before no-select ${
                      selectedLink === work.id + link.type + link.url
                        ? 'show-hint'
                        : 'hide-hint'
                    }`}
                  >
                    {largerThan1234 ? link.text : link.type}
                  </span>
                ) : null}
                {link.authorized ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseOver={() =>
                      setSelectedLink(work.id + link.type + link.url)
                    }
                    onMouseOut={() => setSelectedLink(null)}
                  >
                    {linkMaps[link.type]}
                  </a>
                ) : null}
                {largerThan1060 ? (
                  <span
                    className={`after no-select ${
                      selectedLink === work.id + link.type + link.url
                        ? 'show-hint'
                        : 'hide-hint'
                    }`}
                  >
                    {largerThan1234 ? link.text : link.type}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="work-side">
            <h4 className="work-title">{work.title}</h4>
            <p className="work-description">{work.description.short}</p>
            <ul className="work-techs">
              {work.techs.map(tech => (
                <li className="work-tag no-select">{tech}</li>
              ))}
            </ul>
          </div>

          <LazyLoadComponent visibleByDefault>
            <Picture
              className="work-hero"
              alt={work.img.hero.alt}
              sources={[
                {
                  srcSet: work.img.hero.mobile.webp,
                  media: '(max-width: 480px)',
                  type: 'image/webp'
                },
                {
                  srcSet: work.img.hero.mobile.png,
                  media: '(max-width: 480px)',
                  type: 'image/png'
                },
                {
                  srcSet: work.img.hero.desktop.webp,
                  type: 'image/webp'
                },
                {
                  srcSet: work.img.hero.desktop.png,
                  type: 'image/png'
                }
              ]}
            />
          </LazyLoadComponent>
        </div>
      </ConditionalWrapper>
    </div>
  ));
}

export default Works;
