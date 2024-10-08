import { Path, Svg } from "react-native-svg";

interface InstantSignupProps {
    width?: number;
    height?: number;
}

export const InstantSignup: React.FC<InstantSignupProps> = ({ width = 27, height = 30 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 27 30" fill="none">
            <Path fillRule="evenodd" clipRule="evenodd" d="M0 5C0 2.23858 2.23858 0 5 0H9C9.55229 0 10 0.447715 10 1C10 1.55228 9.55229 2 9 2H6C3.79086 2 2 3.79086 2 6V10C2 10.5523 1.55228 11 1 11C0.447715 11 0 10.5523 0 10V5Z" fill="#00214E"/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M27 25C27 27.7614 24.7614 30 22 30L18 30C17.4477 30 17 29.5523 17 29C17 28.4477 17.4477 28 18 28L21 28C23.2091 28 25 26.2091 25 24L25 20C25 19.4477 25.4477 19 26 19C26.5523 19 27 19.4477 27 20L27 25Z" fill="#00214E"/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M27 5C27 2.23858 24.7614 0 22 0H18C17.4477 0 17 0.447715 17 1C17 1.55228 17.4477 2 18 2H21C23.2091 2 25 3.79086 25 6V10C25 10.5523 25.4477 11 26 11C26.5523 11 27 10.5523 27 10V5Z" fill="#00214E"/>
            <Path fillRule="evenodd" clipRule="evenodd" d="M4.37114e-07 25C1.95703e-07 27.7614 2.23858 30 5 30L9 30C9.55229 30 10 29.5523 10 29C10 28.4477 9.55229 28 9 28L6 28C3.79086 28 2 26.2091 2 24L2 20C2 19.4477 1.55229 19 1 19C0.447716 19 9.2251e-07 19.4477 8.74228e-07 20L4.37114e-07 25Z" fill="#00214E"/>
            <Path d="M0 15C0 14.4477 0.447715 14 1 14H26C26.5523 14 27 14.4477 27 15C27 15.5523 26.5523 16 26 16H0.999999C0.447715 16 0 15.5523 0 15Z" fill="#00214E"/>
        </Svg>
    );
};