import * as React from "react";
import styled from "styled-components";

import closeIcon from "assets/images/close.png";
import editIcon from "assets/images/edit.png";
import PropertyInfoForm from "components/property-info";
import { IFormValues } from "types/form-values";

const Icon = styled.img`
  cursor: pointer;
  float: right;
`;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSubmit: (formValues: IFormValues) => void;
}

const MobilePropertyInfoForm: React.SFC<IProps> = ({
  isOpen,
  onClose,
  onOpen,
  onSubmit
}) => {
  return isOpen ? (
    <React.Fragment>
      <Icon src={closeIcon} alt="Close" width={32} onClick={onClose} />
      <PropertyInfoForm {...{ onSubmit }} />
    </React.Fragment>
  ) : (
    <Icon src={editIcon} alt="Edit" width={32} onClick={onOpen} />
  );
};

export default MobilePropertyInfoForm;
