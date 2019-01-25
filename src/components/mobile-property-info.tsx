import * as React from "react";
import styled from "styled-components";

import closeIcon from "assets/images/close.png";
import editIcon from "assets/images/edit.png";
import PropertyInfoForm, {
  IPropertyInfoFormProps
} from "components/property-info";

const Icon = styled.img`
  cursor: pointer;
  float: right;
`;

interface IProps extends IPropertyInfoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const MobilePropertyInfoForm: React.SFC<IProps> = ({
  isOpen,
  onClose,
  onOpen,
  ...formProps
}) => {
  return isOpen ? (
    <React.Fragment>
      <Icon src={closeIcon} alt="Close" width={32} onClick={onClose} />
      <PropertyInfoForm {...formProps} />
    </React.Fragment>
  ) : (
    <Icon src={editIcon} alt="Edit" width={32} onClick={onOpen} />
  );
};

export default MobilePropertyInfoForm;
