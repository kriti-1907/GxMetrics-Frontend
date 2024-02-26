import React from 'react'
import '../StyleGxMetrics/Footergx.css'
import Container from 'react-bootstrap/Container';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <>
      <footer>
      
      <Container>
      
    
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon={faTwitter} />{' '}&nbsp;&nbsp;
        <FontAwesomeIcon icon={faFacebookF} />{' '}&nbsp;&nbsp;
        <FontAwesomeIcon icon={faInstagram} />{' '}&nbsp;&nbsp;
        <FontAwesomeIcon icon={faYoutube} />{' '}&nbsp;&nbsp;
        <FontAwesomeIcon icon={faPinterest} />&nbsp;&nbsp;
     
    </Container>
    </footer>
    </>
  )
}

export default Footer
