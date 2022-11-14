import React, {LegacyRef} from 'react'

import {getStyles, OgParams} from "../lib/og/api";
import dayjs from "dayjs";
import {bodyStyle} from "../lib/og/style";

export interface OgProps {
  og: OgParams
  bodyRef?: LegacyRef<HTMLDivElement>
  cardRef?: LegacyRef<HTMLDivElement>
}

const Og: React.FC<OgProps> = ({og,bodyRef,cardRef}) => {
  const styles = getStyles(og)

  return (
    <div ref={bodyRef} style={{...styles.body, boxSizing: 'border-box', margin: 'auto', userSelect: 'none', pointerEvents: 'none'}}>
      <div ref={cardRef} style={styles.card as any}>
        <div style={styles.user}>
          <img src={og.avatar} style={styles.avatar} />
          <div style={styles.displayName}>{og.displayName}</div>
          <div style={styles.acct}>{og.acct}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: og.content }} style={styles.content} className="content" />
        <div style={styles.date}>{dayjs(og.createdAt).format("YYYY年MM月DD日 HH:mm")}</div>
      </div>
    </div>
  )
}

export default Og