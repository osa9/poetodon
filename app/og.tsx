import React, {LegacyRef} from 'react'

import {getStyles, OgParams} from "../lib/og/api";
import Poll from "../components/Poll";

export interface OgProps {
  og: OgParams
  bodyRef?: LegacyRef<HTMLDivElement>
  cardRef?: LegacyRef<HTMLDivElement>
}

const Og: React.FC<OgProps> = ({og,bodyRef,cardRef}) => {
  const styles = getStyles(og)

  const createdAt = new Date(og.createdAt)
  const jstCreatedAt = new Date(createdAt.getTime() + (createdAt.getTimezoneOffset() * 60 * 1000) + (9 * 60 * 60 * 1000))
  const formattedCreatedAt = `${jstCreatedAt.getFullYear()}年${(jstCreatedAt.getMonth() + 1).toString().padStart(2, '0')}月${(jstCreatedAt.getDate()).toString().padStart(2, '0')}日 ${jstCreatedAt.getHours().toString().padStart(2, '0')}:${jstCreatedAt.getMinutes().toString().padStart(2, '0')}`

  return (
    <div ref={bodyRef} style={{...styles.body, boxSizing: 'border-box', margin: 'auto', userSelect: 'none', pointerEvents: 'none'}}>
      <div ref={cardRef} style={styles.card as any}>
        <div style={styles.user}>
          <img src={og.avatar} style={styles.avatar} />
          <div style={styles.displayName}>{og.displayName}</div>
          <div style={styles.acct}>{og.acct}</div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: og.content }} style={styles.content} className="content" />
        {og.poll && <div className="mt-4"><Poll poll={og.poll} /></div>}
        <div style={styles.date}>{formattedCreatedAt}</div>
      </div>
    </div>
  )
}

export default Og