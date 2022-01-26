import React from 'react';
import disneyPlusIcon from '../assets/img/disney.png';
import amazonIcon from '../assets/img/amazon.png';
import netflixIcon from '../assets/img/netflix.png';
import './PlatformCard.css'

const PlatformCard = ({ name, monthlyPrice }) => {
    const icons = {
      AmazonPrimeVideo: amazonIcon,
      DisneyPlus: disneyPlusIcon,
      Netflix: netflixIcon
    }
    return <>
      <div className="platform-container">
        <img className="platform-icon" alt={name.split(' ')[0]} src={icons[name.split(' ').join('')]} />
        <span className="plantform-name">{name}</span>
        <span className="plantform-price">{monthlyPrice}</span>
      </div>
    </>
  }

export default PlatformCard;