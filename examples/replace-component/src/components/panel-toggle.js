// Copyright (c) 2023 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import styled from 'styled-components';

import {PanelToggleFactory, Button, Icons, withState} from 'kepler.gl/components';
import {visStateLens} from 'kepler.gl/reducers';

import {setMapConfig} from '../app-reducer';

const StyledPanelToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 16px;
  background-color: ${props => props.theme.sidePanelHeaderBg};
`;

const ButtonWrapper = styled.div`
  margin-bottom: 4px;
`;

const CustomPanelToggleFactory = (...deps) => {
  const PanelToggle = PanelToggleFactory(...deps);
  const PanelToggleWrapper = props => (
    <StyledPanelToggleWrapper>
      <PanelToggle {...props} />
      <ButtonWrapper>
        <Button onClick={() => props.onClickSaveConfig(props.mapState)} width="120px">
          <Icons.Files height="12px" />
          Save Config
        </Button>
      </ButtonWrapper>
    </StyledPanelToggleWrapper>
  );

  return withState(
    // lenses
    [visStateLens],
    // mapStateToProps
    state => ({mapState: state.keplerGl.map1}),
    {
      onClickSaveConfig: setMapConfig
    }
  )(PanelToggleWrapper);
};
CustomPanelToggleFactory.deps = PanelToggleFactory.deps;
export default CustomPanelToggleFactory;
